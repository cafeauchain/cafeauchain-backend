const slugify = string => {
    return string.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
};

export default slugify