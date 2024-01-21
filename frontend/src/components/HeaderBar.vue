<template>
  <Menubar class="rounded-none">
    <template #start>
      <div class="flex align-items-center gap-2 select-none">
        <Avatar
          image="https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          shape="circle"
          size="large"/>
        <div class="flex items-center font-bold ml-2">
          Felix Dziatkowski
        </div>
      </div>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Button
          :label="$t('start-a-tour')"
          size="small" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
  import Avatar from 'primevue/avatar';
  import Menubar from 'primevue/menubar';

</script>
