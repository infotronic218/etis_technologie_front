<template>
  <div id="app" class="container-fluid content px-0">
    <app-header></app-header>
        <div class="main">
              <transition name="page1" mode="out-in">
                  <router-view />
              </transition>
        </div>
        
        <login></login>
    
    <div class="footer">
      <app-footer></app-footer>
    </div>
    
  </div>
</template>

<script>
import $ from 'jquery'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Login from  './components/admin/Login.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-footer':Footer,
    'login':Login,
  },methods:{
    
  }, 
  mounted(){
     $(document).click(function (event) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");               
    var _opened = $navbar.hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
        $navbar.collapse('hide');
       } 
    });
  
  }
}
</script>

<style>


body, html{
  height: 100%;
}
.content{
  min-height: 100%;
  position: relative;
}
.main{
  padding-bottom: 120px;

}
.footer{
     bottom: 0;
     position: absolute;
     height: 120px;
     width: 100%;
}
.mimg{
  max-width: 100%;
  height: auto;
}
.setting{
  outline: 2px solid red;
}



.mlink{
    padding-left: 10px ! important;
    padding-right: 10px ! important;
    padding-top: 5px ! important;
    padding-bottom: 5px ! important;
    border-radius: 10px ! important;  
    background-color: rgb(136, 175, 247)! important;
}
.mlink:hover{
    background-color:  crimson ! important;
    padding-left: 10px ! important;
    padding-right: 10px ! important;
    border-radius: 10px ! important;
    width:100% ! important; 
    color: white ! important;
    text-decoration: none ! important;


}
.m-active{
  background-color: crimson!important;
  color: white ! important;
}
.mbg-dark{
  background-color: #332040!important;
}
.ntec{
     
     border:3px solid;
     border-radius: 10px;
     border-color:orange;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.mshadow{
      box-shadow: 8px 8px 7px #6c757d;
}
.page1-enter-active, .page1-leave-active {
  transition: opacity 1s, transform 1s ! important;
}
.page1-enter, .page1-leave-to {
  opacity: 0;
  transform: translateX(-30%) !important;
}
</style>
