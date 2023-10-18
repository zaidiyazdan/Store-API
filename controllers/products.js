const product = require('../models/product');
const Product = require('../models/product');

const getAllProductsStatic = async (req,res) =>{
    // const search = 'oo';
    //here we are using regex to seacrch for pattern and i is used as a optoion which ignores case senstivity
    // name: {$regex: search,$options: 'i'}
    const products = await Product.find({}).select("name price");
    res.status(200).json({ products , nbHits: products.length})
}

const getAllProducts = async (req,res) =>{
    console.log(req.query);
    const {featured,company,name,sort,fields,numericFilters } = req.query;
    //we will make a queryObject where we will only those data which are present in the model.
    const queryObject = {}
    
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company)
    {
        queryObject.company = company;
    }
    if(name)
    {
        queryObject.name = {$regex: name,$options: 'i'};
    }
    if(numericFilters)
    {   
        const operatorMap = {
            '>' : '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g 
        let filters = numericFilters.replace(regEx, (match) => {
            return `-${operatorMap[match]}-`; // Return the replaced value
        });
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-');
            if(options.includes(field))
            {
                queryObject[field] = {[operator]:Number(value)}
            }
        })
        console.log(numericFilters)
        console.log(filters);
    }
    console.log(queryObject);
    
    let result = Product.find(queryObject).sort();
    if(sort){
        console.log(sort);
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else{
        result = result.sort('createAt');
    }
    //for selectinc specific fields only
    if(fields)
    {
        const filedList = fields.split(',').join(' ');
        result = result.select(filedList);
    }
    //setting up skip and limit to add pagination functionality.
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1)*limit;

    result = result.skip(skip).limit(limit);
    const products = await result;

    res.status(200).json({msg: products,nhHits: products.length})
}

module.exports = {getAllProducts,getAllProductsStatic};