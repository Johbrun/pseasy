import { Category } from '../lib/interfaces/category.interface'
// import firebaseWrapper from '../lib/firebase';
import categoriesDb from '../db/categories.json'

let categories: Category[] = []

const fetchCategories = async (noCache: boolean = false) => {
    if (categories.length > 0 || noCache) {
        console.log('use cache for categories')

        return categories
    }

    console.log('Fetch categories...')
    // const fetched = (await firebaseWrapper.firestore().collection('categories').orderBy('number').get()).docs.map(c =>(c.data())) as Category[];
    const fetched = categoriesDb as unknown as Category[]

    console.log(fetched)
    categories = fetched
    console.log('Fetch categories [OK]')

    return categories
}

export { fetchCategories }
