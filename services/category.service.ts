import { Category } from '../lib/interfaces/category.interface';
import axios from 'axios';

let categories: Category[] = [];

const fetchCategories = async (noCache: boolean = false) => 
{
    if (categories.length > 0 || noCache) return categories;

    console.log('Fetch categories...');
    categories = (await axios.request({
        url: `${process.env.API_URL}/api/categories`
    })).data as Category[];
    console.log('Fetch categories [OK]');

    return categories;
};

export {
    fetchCategories
};