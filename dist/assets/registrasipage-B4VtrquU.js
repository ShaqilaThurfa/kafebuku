import{r as s,u,j as e,L as x,a as p,A as g}from"./index-BYLWf00N.js";import{S as h}from"./sweetalert2.esm.all-CIewtpap.js";function f(){const[l,n]=s.useState(""),[t,i]=s.useState(""),[r,m]=s.useState(""),c=u(),d=async a=>{a.preventDefault();try{await p.post(`${g}/auth/register`,{fullName:l,email:t,Password:r}),console.log("Register success"),c("/login")}catch(o){h.fire({text:o.response?o.response.data.message:"Something went wrong!"})}};return e.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{minHeight:"100vh",backgroundColor:"#F5F5DC"},children:e.jsxs("form",{onSubmit:d,className:"w-50 bg-light p-4 rounded shadow",children:[e.jsx("h1",{className:"text-center mb-4",style:{color:"#8B4513"},children:"Register Page"}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"fullName",className:"form-label",style:{color:"#8B4513"},children:"Full Name"}),e.jsx("input",{name:"fullName",type:"text",className:"form-control",id:"fullName","aria-describedby":"FullName",value:l,onChange:a=>n(a.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"exampleInputEmail1",className:"form-label",style:{color:"#8B4513"},children:"Email address"}),e.jsx("input",{name:"email",type:"email",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",value:t,onChange:a=>i(a.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"exampleInputPassword1",className:"form-label",style:{color:"#8B4513"},children:"Password"}),e.jsx("input",{name:"Password",type:"password",className:"form-control",id:"exampleInputPassword1",value:r,onChange:a=>m(a.target.value)})]}),e.jsx("button",{type:"submit",className:"btn btn-primary my-3",style:{backgroundColor:"#8B4513",borderColor:"#8B4513",justifySelf:"center"},children:"Register"}),e.jsxs("p",{className:"text-center",children:["Do you have an account? ",e.jsx(x,{to:"/login",className:"text-decoration-none",style:{color:"#8B4513"},children:"Login"})]})]})})}export{f as default};