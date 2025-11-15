import List from '../model/listModel.js'

export const getList = async(req,res)=>{

    try {
        
        const list = await List.find();
        res.status(200).json(list);

    } catch (error) {
        console.error("Cannot get notes",error);
        res.status(500).json({message:"Internal server error"});
    }    

} 

export const addList = async(req,res)=>{

    try {
        
        const {} = req.body;
        const newList = await List.insertOne 
    } catch (error) {
        console.error("Cannot add list",error);
        res.status(500).json({message:"Internal server error"});
    }  
}