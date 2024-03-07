export const createBook = async (req, res) => {

try {
    
    res.status(201).json(
        {
            success: true,
            message: "book created"
        }
    )
} catch (error) {
    res.status(500)
    
}
 
}