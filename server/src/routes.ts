import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {

    //Create a new route called habits created from input parameters in a modal
    app.post ('/habits', async (request) => {    
         // zod validation
        const createHabitBody = z.object ({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })
            
        //It'll receive this new data input
        const { title, weekDays } = createHabitBody.parse(request.body)

        //Use dayjs to make operations with dates. This will standardize the date of creation  
        //Method startOf and toDate
        const today = dayjs().startOf('day').toDate()

        //Create new Habit from input
        await prisma.habit.create({
            data: {
                title,
                created_at: today,

                //create multiple registrations. Create a new object
                //The weekday in the db will be the sabe weekday received as a parameter
                weekDays: {
                    create: weekDays.map (weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    })
                }


            }
        })
    })

    //Create a new route of what habits were registered in a specific day
    app.get ('./day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const { date } = getDayParams.parse(request.query)

        const weekDay = dayjs(date).get('day')

        //all habits that were possible
        //all habits that were already completed
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                
                weekDays: {
                some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        return {
            possibleHabits,
        }

    })

}

