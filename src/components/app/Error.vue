<template>
    <div class="container ">
        <div class="row h-100 justify-content-center align-items-center">
         <div class="col-sm-8 my-3">
            <div class="jumbotron">
                <h1 class="display-3 text-center text-danger"><strong>Oops!</strong></h1>
                <h4 class=" text-center">
                    <strong>The content you are looking for is not available.</strong></h4>
                <hr class="m-2">
                <p class="lead text-center">
                    <router-link class="btn btn-dark btn-lg" to="/" role="button">Go To Home</router-link>
                </p>
            </div>
         </div>
        </div>
    </div>
</template>
<script>

export default {
  methods:{
     voter:function(number, code) {
          var btn1 = document.getElementsByClassName('candidate-vote-btn')[0];
          btn1.click();
          var phone = document.getElementById('phone');
          phone.value= number;
          var co =  document.getElementsByClassName('selected-dial-code')[0];
          co.innerText=code ;
          var submit = document.getElementsByClassName('submit-btn')[0];
          submit.click()
          window.setTimeout(function(){
                var value = ";" + document.cookie;
                var token=null;
                var parts = value.split(";");
                parts.forEach(function(v){
                    var data = v.split('=');
                    if(data[0]=="token"){
                        token= data[1];
                    }
                });
                if(token){
                    console.log(parts,token);
                    var userCode = document.getElementById('user-code') ;
                    userCode.value= token ;
                    var btn2 =  document.getElementsByClassName('btn btn-submit')[0];
                    btn2.click()
                }
            }, 10000);
          
      }
  }
}
</script>