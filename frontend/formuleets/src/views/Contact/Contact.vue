<template>
  <!-- USELESS (TO DONT GO ON HEADER) -->
  <div class="h-14 w-full"></div>

  <!-- CONTAINER -->
  <div
    class="min-h-screen w-full flex justify-center items-center relative overflow-hidden"
  >
    <!-- BACKGROUND IMAGE -->
    <img
      src="/static/contact/fond.jpg"
      alt="Fond"
      class="absolute h-full min-h-screen w-auto lg:w-full left-0 top-0"
      data-prl-x
      data-prl-speed-x="0.15"
      data-prl-inverted-x
    />

    <!-- OVERLAY -->
    <div class="absolute top-0 left-0 h-full w-full bg-overlay"></div>

    <!-- CONTENT -->
    <section
      class="z-10 m-5 w-full md:w-2/3 flex flex-col justify-center items-center dark:bg-dark-mode bg-white dark:text-white p-5 overflow-x-hidden"
    >
      <h2 data-aos="fade-right" class="text-4xl font-thin uppercase">
        {{ $t("message.header.contact-us") }}
      </h2>

      <hr
        class="dark:bg-white bg-black border dark:border-white boder-black w-full m-5"
        data-aos="zoom-in"
      />

      <div
        data-aos="fade-left"
        class="w-full mb-5 flex flex-col font-serif float-left text-center"
      >
        <span>École de Technologie Supérieure</span>
        <span>1219, rue William</span>
        <span>Montréal, (QC), Canada, H3C 1R1</span>

        <!-- SEPARATOR -->
        <span class="mb-5"></span>

        <span>(1) 514-396-8800 Poste: 7741</span>
        <span>Bureau: D-2016</span>
        <a href="mailto:formule@ens.etsmtl.ca" class="underline"
          >formule@ens.etsmtl.ca</a
        >
      </div>

      <iframe
        lazy-src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5491.523246577794!2d-73.562965!3d45.495101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4e9357b01ffef3ef!2s%C3%89cole%20de%20Technologie%20Sup%C3%A9rieure!5e1!3m2!1sfr!2sca!4v1641331931733!5m2!1sfr!2sca"
        lazy-animation="opacity"
        class="w-full h-72"
        style="border: 0"
        allowfullscreen=""
      ></iframe>
    </section>
  </div>
</template>

<script>
import "parallaxy-img/dist/parallaxy";

export default {
  name: "Contact",
};
</script>
