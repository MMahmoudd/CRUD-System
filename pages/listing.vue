<template>
  <div class="container">
    <div class="list-page">
      <listComponent />
    </div>
  </div>
</template>

<script>
import listComponent from '../components/list';
export default {
      middleware: 'authenticated',
      components: {
      listComponent,
    }
}
</script>
