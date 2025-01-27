<template>
  <footer class="h-72 w-full">
    <div class="bg-dark-mode-2 h-72 w-full flex flex-col justify-around">
      <!-- SOCIAL MEDIAS -->
      <div
        class="flex-initial w-full p-3 flex justify-center items-center gap-3"
      >
        <template v-for="media of medias" :key="media">
          <a
            :href="media.link"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-3 text-white hover:bg-gray-500 transition-all text-lg md:border border-gray-500 rounded-full flex items-center justify-center w-16 h-16"
          >
            <i :class="media.icon" class="absolute"></i>
          </a>
        </template>
      </div>

      <!-- ADRESS -->
      <div class="flex-initial w-full p-2 text-center">
        <span class="text-white">
          FORMULE ETS, 1219 RUE WILLIAM, MONTRÉAL, QC, H3C 1R1, CANADA  +1 514-396-8800
          by 
          <a href="mailto:charbonn.yoann@gmail.com" class="ml-1 mr-1 font-bold">
            yoannchb
          </a>
          for
          <a href="mailto:FORMULE@ENS.ETSMTL.CA" class="ml-1 font-bold">
          FORMULE@ENS.ETSMTL.CA
          </a>
        </span>
      </div>

      
    </div>
  </footer>
</template>
<script>
import medias from "./medias";

export default {
  name: "Footer",
  data() {
    return {
      medias: medias,
    };
  },
};
</script>
