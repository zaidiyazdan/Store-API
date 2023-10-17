const product = require('../models/product');
const Product = require('../models/product');

const getAllProductsStatic = async (req,res) =>{
    // const search = 'oo';
    //here we are using regex to seacrch for pattern and i is used as a optoion which ignores case senstivity
    // name: {$regex: search,$options: 'i'}
    const products = await Product.find({}).sort("-name price").limit(20);
    res.status(200).json({ products , nbHits: products.length})
}

const getAllProducts = async (req,res) =>{
    console.log(req.query);
    const {featured,company,name,sort} = req.query;
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
    if(sort)
    {

    }
    console.log(queryObject);
    
    let products = await Product.find(queryObject).sort();
    if(sort){
        
    }
    res.status(200).json({msg: products,nhHits: products.length})
}

module.exports = {getAllProducts,getAllProductsStatic};