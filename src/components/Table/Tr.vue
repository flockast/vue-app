<template>
  <tbody>
    <tr :class="{'is-opened': isOpen}">
      <td>3214</td>
      <td>Arnold Schwarzenegger</td>
      <td>today</td>
      <td>
        <div class="table-options">
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--save">
              <i class="far fa-save"></i>
            </button>
          </div>
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--remove">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="table-options__item">
            <button
                class="table-option-btn table-option-btn--open"
                @click="toggleSub"
                :class="{'is-opened': isOpen}">
              <i class="fas fa-chevron-up table-option-btn__icon"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
    <tr v-if="isOpen" class="sub">
    <td colspan="4">
      <div class="grid">
        <div class="cell cell--4">
          <div class="table-wrapper">
            <table class="table">
              <thead>
              <tr>
                <th>id</th>
                <th>3214</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>hidden</td>
                <td><input type="checkbox"></td>
              </tr>
              <tr>
                <td>name</td>
                <td><input type="text" class="input input--full" value="Arnold Schwarzenegger"></td>
              </tr>
              <tr>
                <td>date</td>
                <td><input type="text" class="input input--full" value="today"></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="cell cell--8">
          <div class="table-wrapper">
            <div class="title title--sm">films:</div>
            <table class="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>hidden</th>
                  <th>title</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3210</td>
                  <td><input type="checkbox"></td>
                  <td><input type="text" class="input input--full" value="batman"></td>
                </tr>
                <tr>
                  <td>3211</td>
                  <td><input type="checkbox"></td>
                  <td><input type="text" class="input input--full" value="robin"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </td>
</tr>
  </tbody>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleSub () {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
