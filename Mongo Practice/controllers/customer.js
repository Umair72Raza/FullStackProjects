const { request } = require ('express')

const customInfo = require('../models/customer')

const enterCustomer = async (req, res) => {
    try{
        const {name, products, address} = req.body;
        const newCustomer =  new customInfo({name, products, address});
        await newCustomer.save();
        res.json(newCustomer);
    }
    catch(error)
    {
        res.status(500).send({ error: error.message });
    }

};

const allCustomers  = async(req,res) => {
    try{
        await customInfo.find().then((customers)=>res.status(201).json(customers));
    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
}

const getById = async(req,res) =>{
    try{
        const data = await customInfo.findById(req.params.id)
        if(!data)
        {
            res.json({message: "Data not found against ID"})
        }
        res.json(data)

    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
}




const deleteCustomerById = async(req,res) =>
{
    try{
    let dataToDelet = await customInfo.findByIdAndDelete(req.params.id)
    if(!dataToDelet)
    {
        res.status(404).json({ message: "Data not found" });
    }
    res.json({message: "Data deleted Successfully"})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }


}

module.exports = {
    enterCustomer,
    allCustomers,
    getById,
    deleteCustomerById
}