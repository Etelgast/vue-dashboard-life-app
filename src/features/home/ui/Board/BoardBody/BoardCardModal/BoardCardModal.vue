<script setup lang="ts">
defineEmits(['toggle-modal'])
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal">
      <header>
        <h1>Add new task</h1>
        <span @click="$emit('toggle-modal')"></span>
      </header>
      <form action="">
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="subtitle" placeholder="subtitle" />
        <textarea placeholder="description"></textarea>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--gray-color);
  z-index: 99;
}

.modal {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
  width: 550px;
  padding: 15px 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 12px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      position: relative;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: var(--gray-color);
      opacity: 0.3;
      cursor: pointer;

      &::after {
        content: 'x';
        position: absolute;
        top: -1px;
        left: 8px;
      }
    }
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ded2d9;
      border-radius: 5px;
    }
  }
}
</style>
