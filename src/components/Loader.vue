<template>
    
    <!-- Modal -->
    <div class="modal px-4 fade" id="modalLoader" data-keyboard="false" role="dialog" tabindex="-1" data-backdrop="true"  aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog  modal-sm modal-dialog-centered " role="document">
            <div class="modal-content bg-dark">
                <div class="modal-body">
                    <div class="container-fluid">
                       <div class="d-flex flex-row"> 
                          <div class="flex-fill w-25"> 
                              <div class="spinner-border text-primary" role="status">
                                   <span class="sr-only"><strong> Loading...</strong></span>
                              </div>
                          </div>
                          <div class="flex-fill "> 
                              <label class="text-white"> {{messageS}}</label>
                          </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    props:['loading'],
    data(){
        return{
           message:''
           
        }
    },

    mounted(){
       
    },
    computed: {
        loaded(){
            return this.$store.state.loader.loaded
        },
        messageS(){
            return this.$store.state.loader.message
        }
    },
    watch: {
        'loading':function(newState,  oldState){
            if(newState){
                $('#modalLoader').modal('show')
                setTimeout(function(){
                    $('#modalLoader').modal('hide')
                },6000)
            }else{
                $('#modalLoader').modal('hide')
            }
        }
    },

   
}
</script>