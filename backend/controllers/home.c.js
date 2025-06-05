const cHome = {
  indexHome: (req, res) => {
    return res.render("index", { title: "Home (bcrypt-JWT-Cookies)" });
  },
};

export default cHome;
