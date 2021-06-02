(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{392:function(t,e,r){"use strict";var o={props:["error"]},n=r(25),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("span",{staticClass:"text-danger"},[t._v(t._s(t.error))])])}),[],!1,null,null,null);e.a=component.exports},397:function(t,e,r){},412:function(t,e,r){"use strict";r.r(e);var o=r(18),n=(r(39),r(397),{head:function(){return{title:"".concat("Task"," Login")}},components:{Error:r(392).a},data:function(){return{errors:[]}},mounted:function(){window.addEventListener("online",(function(){console.log("online")})),window.addEventListener("offline",(function(){console.log("offline")}))},methods:{login:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var form,r,data,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,form=event.target,form=new FormData(form),$(".btn").attr("disabled",!0),e.next=6,axios.post("/login",form);case 6:r=e.sent,t.$notify({group:"foo",text:r.data.message,type:"success"}),$(".btn").attr("disabled",!1),t.errors=[],data={token:r.data.token,user:r.data.user},t.$store.commit("user/login",data),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(0),$(".btn").attr("disabled",!1),t.errors={},e.t0.response?400==e.t0.response.status?t.$notify({group:"foo",text:e.t0.response.data.message,type:"error"}):422==e.t0.response.status?(t.$notify({group:"foo",text:e.t0.response.data.message,type:"error"}),o=e.t0.response.data.errors,t.errors=o):t.$notify({group:"foo",text:e.t0.response.data.message,type:"error"}):t.$notify({group:"foo",text:"No internet access",type:"error"});case 19:case"end":return e.stop()}}),e,null,[[0,14]])})))()}}}),c=r(25),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"body"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row justify-content-md-end justify-content-sm-center"},[r("div",{staticClass:"col-md-6 col-sm-8"},[r("div",{staticClass:"card shadow-lg"},[r("div",{staticClass:"card-body"},[r("form",{on:{submit:function(e){return e.preventDefault(),t.login()}}},[t._m(0),t._v(" "),r("div",{staticClass:"form-group row justify-content-center"},[r("label",{staticClass:"col-form-label col-md-3 text-capitalize",attrs:{for:"email"}},[t._v("email")]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("input",{staticClass:"form-control",attrs:{placeholder:"Please enter your email",type:"email",name:"email",id:"email"}}),t._v(" "),t._l(t.errors.email,(function(t,e){return r("error",{key:e,attrs:{error:t}})}))],2)]),t._v(" "),r("div",{staticClass:"form-group row justify-content-center"},[r("label",{staticClass:"text-capitalize col-form-label col-md-3",attrs:{for:"password"}},[t._v("password")]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Please enter your password",name:"password",id:"password"}}),t._v(" "),t._l(t.errors.password,(function(t,e){return r("error",{key:e,attrs:{error:t}})}))],2)]),t._v(" "),r("div",{staticClass:"form-group row justify-content-end"},[r("div",{staticClass:"col-md-11"},[r("button",{staticClass:"btn btn-primary"},[t._v("Login")]),t._v(" "),r("br"),t._v(" "),r("br"),t._v(" "),r("span",{staticClass:"text-capitalize text-muted"},[r("span",[t._v("need to")]),t._v(" "),r("nuxt-link",{attrs:{to:"/register"}},[t._v("create a new")]),t._v(" "),r("span",[t._v("account")])],1)])])])])])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("h2",{staticClass:"text-center text-capitalize"},[t._v("user login")])])])}],!1,null,null,null);e.default=component.exports}}]);