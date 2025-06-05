const usuariosDB = [
  {
    _id: 1,
    username: "fer1",
    password: "fer12345",
  },
  {
    _id: "cdd1c272-3093-4bd0-91b3-422874512aaa",
    username: "admin", // pass: "admin"
    password: "$2b$10$w7NbOxpCNeNPucFJ/gT0meNi3ahFmKz8/1qeVPqS0djfDYKh//GOa",
  },
  {
    _id: 3,
    username: "ss", // pass: "ss"
    password: "$2b$10$XRKf/hdFPnh/Ag.o2clMFOEYKRaSpn1NoxYlCqx8NcdLciTIEZxqq",
  },
];

const bold = (text) => `\x1b[1m${text}\x1b[0m`;
setTimeout(() => console.log(bold("--→ Connected LocalDB ✅")), 10);

export default usuariosDB;
