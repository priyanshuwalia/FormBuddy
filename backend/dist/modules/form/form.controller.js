import * as FormService from "./form.service.js";
export const createFormHandler = async (req, res) => {
    try {
        const form = await FormService.createForm(req.body);
        res.status(201).json(form);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create form", details: err });
    }
};
export const getFormHandler = async (req, res) => {
    try {
        console.log(`Searching for slug: '[${req.params.slug}]', length: ${req.params.slug.length}`);
        const form = await FormService.getFormBySlug(req.params.slug);
        if (!form) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        res.json(form);
    }
    catch (err) {
        res.status(500).json({ error: "failed to fetch form", details: err });
    }
};
export const getUserFormsHandler = async (req, res) => {
    try {
        // @ts-ignore 
        const userId = req.user.id;
        const forms = await FormService.getFormbyUserId(userId);
        if (!forms || forms.length === 0) {
            res.json({ error: "No forms found for this user" });
            return;
        }
        res.json(forms);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch forms", details: err });
    }
};
export const updateFormHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        //@ts-ignore
        const userId = req.user.id;
        const updated = await FormService.updateFormById(id, userId, { title, description });
        if (updated.count === 0) {
            res.status(404).json({ error: "Form not found or you don’t have permission." });
            return;
        }
        res.json({ message: "Form updated successfully." });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update Form", details: err });
    }
};
export const deleteFormHandler = async (req, res) => {
    try {
        const { id } = req.params;
        //@ts-ignore
        const userId = req.user.id;
        const deleted = await FormService.deleteFormById(id, userId);
        if (deleted.count === 0) {
            res.status(404).json({ error: "Form Not Found or not owned by you" });
            return;
        }
        res.json({ message: "Form Deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete form", details: err });
    }
};
