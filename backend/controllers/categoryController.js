import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


//=> get all Category
export const categoryController = async (req, res)=> {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Category List",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all category"
        })
    }
}

//=> single categoory 
export const singalCategoryController = async (req, res)=> {
    try {

        const existingSlug = await categoryModel.findOne({slug: req.params.slug})
        if(!existingSlug){
            return res.status(404).send({success: true, message: "category not Exisits"})
        }

        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category, 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single Category"
        })
    }
};

//=> createCategory
export const createCategoryController = async (req, res)=> {

    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message: "Name is required"})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({message: "category Already Exisits"})
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "Created Category",
            category,
          });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }

};

//=> Update category
export const updateCategoryController = async (req, res)=> {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)},
        {new: true}
        );
        res.status(200).send({
            success: true,
            message: "Category Updated Succesfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating category",
            error,
        })
    }
};

//=> Delete Category
export const deleteCategoryController = async (req, res)=>{
    try {
        const { id } = req.params;

        const existingCategory = await categoryModel.findById(id)
        if(!existingCategory){
            return res.status(200).send({success:true, message: "Category Not Found"})
        }

        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error,
        })
    }
};