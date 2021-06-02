(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{392:function(t,r,e){"use strict";var o={props:["error"]},n=e(25),component=Object(n.a)(o,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("span",{staticClass:"text-danger"},[t._v(t._s(t.error))])])}),[],!1,null,null,null);r.a=component.exports},397:function(t,r,e){},413:function(t,r,e){"use strict";e.r(r);var o=e(18),n=(e(39),e(397),{head:function(){return{title:"".concat("Task"," register")}},components:{Error:e(392).a},data:function(){return{errors:[]}},mounted:function(){},methods:{register:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var form,e,data,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,form=event.target,form=new FormData(form),$(".btn").attr("disabled",!0),r.next=6,axios.post("/register",form);case 6:e=r.sent,t.$notify({group:"foo",text:e.data.message,type:"success"}),$(".btn").attr("disabled",!1),t.errors=[],data={token:e.data.token,user:e.data.user},t.$store.commit("user/login",data),r.next=19;break;case 14:r.prev=14,r.t0=r.catch(0),$(".btn").attr("disabled",!1),t.errors={},r.t0.response?400==r.t0.response.status?t.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}):422==r.t0.response.status?(t.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}),o=r.t0.response.data.errors,t.errors=o):t.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}):t.$notify({group:"foo",text:"No internet access",type:"error"});case 19:case"end":return r.stop()}}),r,null,[[0,14]])})))()}}}),l=e(25),component=Object(l.a)(n,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"body"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row justify-content-md-end justify-content-sm-center"},[e("div",{staticClass:"col-md-6 col-sm-8"},[e("div",{staticClass:"card shadow-lg"},[e("div",{staticClass:"card-body"},[e("form",{on:{submit:function(r){return r.preventDefault(),t.register()}}},[t._m(0),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"col-form-label col-md-3 text-capitalize",attrs:{for:"arabic_name"}},[t._v("arabic name")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{placeholder:"arabic name",type:"text",name:"ar[name]",id:"arabic_name"}}),t._v(" "),t._l(t.errors["ar.name"],(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"col-form-label col-md-3 text-capitalize",attrs:{for:"english_name"}},[t._v("English name")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{placeholder:"English name",type:"text",name:"en[name]",id:"english_name"}}),t._v(" "),t._l(t.errors["en.name"],(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"col-form-label col-md-3 text-capitalize",attrs:{for:"avatar"}},[t._v("avatar")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{type:"file",name:"avatar",id:"avatar"}}),t._v(" "),t._l(t.errors.avatar,(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"col-form-label col-md-3 text-capitalize",attrs:{for:"birthdate"}},[t._v("birthdate")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{placeholder:"birthdate",type:"date",name:"birthdate",id:"birthdate"}}),t._v(" "),t._l(t.errors.birthdate,(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"col-form-label col-md-3 text-capitalize",attrs:{for:"email"}},[t._v("email")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{placeholder:"Please enter your email",type:"email",name:"email",id:"email"}}),t._v(" "),t._l(t.errors.email,(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"text-capitalize col-form-label col-md-3",attrs:{for:"password"}},[t._v("password")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Please enter your password",name:"password",id:"password"}}),t._v(" "),t._l(t.errors.password,(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-center"},[e("label",{staticClass:"text-capitalize col-form-label col-md-3",attrs:{for:"password_confiramtion"}},[t._v("password confirmation")]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Please enter your password confirmation",name:"password_confirmation",id:"password_confirmation"}}),t._v(" "),t._l(t.errors.password_confirmation,(function(t,r){return e("error",{key:r,attrs:{error:t}})}))],2)]),t._v(" "),e("div",{staticClass:"form-group row justify-content-end"},[e("div",{staticClass:"col-md-11"},[e("button",{staticClass:"text-capitalize btn btn-primary"},[t._v("register")]),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("span",{staticClass:"text-muted text-capitalize"},[e("span",[t._v("Already")]),t._v(" "),e("nuxt-link",{attrs:{to:"/login"}},[t._v("have account")])],1)])])])])])])])])])}),[function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"row mb-3"},[e("div",{staticClass:"col-md-12"},[e("h2",{staticClass:"text-center text-capitalize"},[t._v("user register")])])])}],!1,null,null,null);r.default=component.exports}}]);