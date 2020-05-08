
<template>
  <div class="heroes-page">
    <div class="container">
      <h1 class="title">Course Heroes</h1>
      <portal-target v-for="hero in heroes" :key="`p-${hero._id}`" :name="`modal-view-${hero._id}`"></portal-target>
      <table class="heroes-table table is-responsive">
        <thead>
          <tr class="main-table-row">
            <th>Image</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="hero in heroes"
            :key="hero._id"
            @click="openModal(hero._id)" 
            :class="{'isActive': activeHero._id === hero._id}"
            class="table-row"
          >
            <td>{{hero.image || 'Not Set'}}</td>
            <td>{{hero.title || 'Not Set'}}</td>
            <td>{{hero.subtitle || 'Not Set'}}</td>
            <td>
              <span v-if="activeHero._id === hero._id" class="tag is-success">Active</span>
              <span v-else class="tag is-danger">Inactive</span>
            </td>
            <td class="modal-td" v-show="false">
              <portal :to="`modal-view-${hero._id}`">
                <Modal
                  :ref="`modal-${hero._id}`"
                  :showButton="false"
                  @submitted="({closeModal}) => activateHero(hero._id, closeModal)"
                  actionTitle="Make Active"
                  openTitle="Favorite"
                  title="Make Course Hero">
                  <div>
                    <div class="subtitle">
                      Title: {{hero.title || 'Not Set'}}
                    </div>
                    <div class="subtitle">
                      Subtitle: {{hero.subtitle || 'Not Set'}}
                    </div>
                    <figure class="image is-3by1">
                      <img :src="hero.image">
                    </figure>
                  </div>
                </Modal>
              </portal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Modal from '~/components/shared/Modal';
import { mapState } from 'vuex';

export default {
  middleware: 'admin',
  components: {
    Modal
  },
  computed: {
    ...mapState({
      heroes: ({ instructor }) => instructor.heroes,
      activeHero: ({ hero }) => hero.item
    })
  },
  async fetch({store}) {
    await store.dispatch('instructor/fetchHeroes')
  },
  methods: {
    openModal(modalId) {
      this.$refs[`modal-${modalId}`][0].openModal()
    },
    activateHero(heroId, closeModal) {
      closeModal();
      this.$store.dispatch('instructor/activateHero', heroId)
        .then(() => {
          this.$toasted.success("Hero has been activated!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
          closeModal();
        })
        .catch(() => {
          this.$toasted.error("Hero cannot be activated!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        });
    }
  }
}
</script>
<style scoped lang="scss">
  .heroes-page {
    max-width: 1000px;
    margin: 0 auto 5rem auto;
    margin-top: 40px;
  }
  .title {
    font-size: 45px;
    font-weight: bold;
  }
//   .isActive {
//   }
  .table-row {
    margin: 20px;
    &.isActive {
      background-color: #dfffe1
    }
    &:hover {
      cursor: pointer;
      background-color: #e4e4e4;
    }
  }
</style>