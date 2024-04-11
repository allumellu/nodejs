
const Employee= require('../models/Employee')

const createEmployee = async(req, res)=>{
    try{
        const{name, email, phone, city} = req.body
        const employee = new Employee({
            name,
            email, 
            phone,
            city
        })
        await employee.save()
        res.status(201).json(employee)
    } catch(error){
        console.log("there is an error", error)
        res.status(500).json({messag:'server error'})
    }
}
// http://localhost:5000/employees/allemployees
const getEmployees = async(req, res)=>{

    try{
        const employees= await Employee.find()
        res.status(200).json(employees)
    } catch (error){
        console.error("There is an error:", error)
        res.status(500).json({message:"server error"})
    }
}
// http://localhost:5000/employees/employee/id
const singleEmployee=async (req, res)=>{
    try{
        const employee = await Employee.findById(req.params.id)
        if(!employee){
            return res.status(404).json({message:"Employee not found"})
        }
        res.status(200).json(employee)
    }
    catch(error){
        console.error('there is an error:', error)
    }
}

//localhost:5000/employees/updateEmployee/id
const updatemployee=async (req, res)=>{
    try{
        const{name, email, phone, city}= req.body

        const myEmployee = await Employee.findByIdAndUpdate(req.params.id, {name, email, phone, city}
        
        )
        if(!myEmployee){
            return res.status(404).json({message:"Employee not found"})
        }
        res.status(200).json(myEmployee)
    }
    catch(error){
        console.error('there is an error:', error)
        res.status(500).json({message:"Server error"})
    }
}

// localhost:5000/employees/deleteEmployee/id
const deleteEmployee = async(req, res)=>{
    try{
        const deleteEmployee= await Employee.findByIdAndDelete(req.params.id)
        res.status(204).send()
    }catch(error){
        console.erroe('there is an error:', error)
        res.status(500).json({message:"server error"})
    }
}
module.exports= {createEmployee, getEmployees, singleEmployee, updatemployee, deleteEmployee}