<template>
  <Card class="rounded-xl overflow-hidden">
    <template #content>
      <DataTable
        id="TechStackTable"
        class="rounded-xl overflow-hidden"
        removableSort
        sortField="skillRating"
        :sortOrder="-1"
        :value="techStack"
        size="small"
        :paginator="techStack.length > maxEntriesPerPage"
        :rows="maxEntriesPerPage">
        <Column
          field="name"
          :header="$t('name')"
          sortable>
          <template #body="slotProps">
            <div class="flex flex-row gap-4 items-center">
              <div class="w-12 p-1">
                <img
                  :src="slotProps.data.image.url"
                  :alt="slotProps.data.name"
                  class="w-6rem border-round" />
              </div>
              <span>
                {{ slotProps.data.name }}
              </span>
            </div>
          </template>
        </Column>
        <Column
          field="catagory"
          class="hidden md:table-cell"
          :header="$t('category')">
          <template #body="slotProps">
            <span>
              {{ getTranslatedTechStackCategory(slotProps.data.category) }}
            </span>
          </template>
        </Column>
        <Column
          field="skillRating"
          :header="$t('skill-rating')"
          sortable>
          <template #body="slotProps">
            <Rating
              v-model="slotProps.data.skillRating"
              :stars="6"
              readonly
              :cancel="false"/>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
  import Rating from 'primevue/rating';
  import { useI18n } from 'vue-i18n';

  import { TechStackCategory } from '@/models/ui-models';
  import { useDataStore } from '@/stores/dataStore';

  const { t } = useI18n();

  const dataStore = useDataStore();
  const { techStack } = storeToRefs(dataStore);

  const maxEntriesPerPage = 8;

  const getTranslatedTechStackCategory = (category: TechStackCategory) => {
    switch (category) {
      case TechStackCategory.Coding:
        return t('coding').capitalizeFirstLetter();
      case TechStackCategory.Design:
        return t('design').capitalizeFirstLetter();
    }
  };

</script>

<style lang="scss">
#TechStackTable {
  .p-paginator-bottom {
   border: none!important;
    .p-paginator.p-component {
      border:none!important;
    }
  }
}
</style>