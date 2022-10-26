import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios')

export default class StarWarsController {

  public async index({response}: HttpContextContract) {
    const results = await axios.get(`${process.env.BASE_URL}/films`)
    response.status(results.status)
    const data = results.data.results.sort((a: any,b: any) => {
      return new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf();
    })

    return { results: data }
  }

  public async people({response, request, params}: HttpContextContract) {
    const { gender }: any = request.qs()
    const criteriaParam: string = params.sort.trim()
    let resultsData: Array<object> = []

    const results = await axios.get(`${process.env.BASE_URL}/people`)

    const people: Array<any> = results.data.results
    const peopleData = people.sort((a: any , b: any): any => {
      if (criteriaParam === 'name') {
        return ('' + a.name).localeCompare(b.name)
      }
      if (criteriaParam === 'gender') {
        return ('' + a.gender).localeCompare(b.gender)
      }
      if (criteriaParam === 'height') {
        return parseInt(b.height) - parseInt(a.height)
      }
      return people
    })
    resultsData = peopleData

    if (gender) {
      resultsData = peopleData.filter(person => {
        return person.gender === gender.toLowerCase().trim()
      })
    }
    const metadata = StarWarsController.getMetaData(resultsData)

    response.status(results.status)
    return { ...metadata, results: resultsData }
  }

  private static getMetaData(people: Array<any>): {count: number, total_height_cm: number, total_height_ft: number} {
    const count: number = people.length
    const { total_height_cm, total_height_ft }  = StarWarsController.calculateTotalHeight(people)
    return { count, total_height_cm, total_height_ft}
  }

  private static calculateTotalHeight(people: Array<any>): {total_height_cm: number, total_height_ft: number} {
    let total_height_cm: number = 0
    people.map((person) => {
      total_height_cm += parseInt(person.height)
    })
    const total_height_ft = StarWarsController.convertHeight(total_height_cm)
    return { total_height_ft, total_height_cm}
  }

  private static convertHeight(heightCM: number): number {
    return Math.floor(heightCM/30.48)
  }

}
