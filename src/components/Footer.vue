<template>
    <div  class="footer bg-dark">
              <div class="container py-3">
                  <p class="text-center  text-white"><strong>ETIS Technologies &copy; {{year}} Burkina Faso</strong></p>
                  <p class="text-center  text-white"><strong>Tous droits réservés</strong></p>
              </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            year: new Date().getUTCFullYear()
        }
    },
}
</script>