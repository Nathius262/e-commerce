

export const indexPage = async (req, res)=> {
    return res.render('./layouts/index', {title: "Gadget Gallery"})
}