import { helpers } from 'vuelidate/lib/validators';

export const supportedFileType = (value) => {
    if (!helpers.req(value)) return true;
    const allowedFormat = ["jpg", "jped", "png"];
    const extenion = value.split('.').pop();
    return allowedFormat.includes(extenion);
}