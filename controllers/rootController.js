
export const index_view = async (req, res) => {
    const context = {
        title: "Gadget Gallery Home"
    }
    return res.render('./layouts/index', context)
}