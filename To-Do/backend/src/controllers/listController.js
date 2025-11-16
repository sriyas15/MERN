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
        
        const { content,amount } = req.body;

        const newList = await List.insertOne({content,amount});

        res.status(201).json({message:"New List added",newList},);

    } catch (error) {
        console.error("Cannot add list",error);
        res.status(500).json({message:"Internal server error"});
    }  
}

export const updateList = async(req,res)=>{

    try {
        
        const { content,amount } = req.body;

        const uList = await List.findByIdAndUpdate(req.params.id,{content,amount});

        if(!uList) return res.status(404).json({message:"List not Found"});

        res.status(200).json({message:"Updated the List ",uList});

    } catch (error) {
        console.error("Cannot update the list",error);
        res.status(500).json({message:"Internal server error"});
    }  
}

export const deleteList = async(req,res)=>{

    try {
        
        const del = await List.findByIdAndDelete(req.params.id);

        if(!del) return res.status(404).json({message:"List not Found"});

        res.status(200).json({message:"List Deleted"});
    } catch (error) {
        console.error("Cannot delete the list",error);
        res.status(500).json({message:"Internal server error"});
    }
}