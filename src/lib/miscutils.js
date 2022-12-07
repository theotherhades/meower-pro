/**
 * **loadForm(form):**
 * Gets an HTML form and returns it as JSON data.
 */
export default function loadForm(form) {
    const formData = new FormData(form.target);
    const data = {};

    for (let field of formData) {
        const [key, value] = field;
        data[key] = value;
    }
    return data;
}