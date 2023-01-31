<template>
  <div>
    <q-btn
      :outline="isOutlined"
      color="grey-2"
      unelevated
      no-caps
      class="text-grey-6 full-width"
      :class="isFilter ? 'q-pb-xs' : 'text-weight-bold'"
      :ripple="false"
      align="between"
      :loading="loading"
      icon-right="keyboard_arrow_down"
      @click="handleInitiateDropdown"
    >
      <div class="ellipsis" style="max-width: 80%">
        {{ getDropdownLabel }}
      </div>
      <q-menu anchor="bottom middle" self="top middle" :offset="[0, 8]">
        <q-item-label class="q-pa-none" header>
          <q-input
            v-model="filter"
            class="q-px-md"
            style="border: none"
            @input="handleInput"
            debounce="1000"
          />
        </q-item-label>
        <q-separator />
        <q-list
          ref="scrollTargetRef"
          class="scroll"
          style="max-height: 250px; width: 450px"
        >
          <div
            v-if="!loading && categoryList.length === 0"
            class="q-px-md q-py-sm"
          >
            {{ $t('report.noData') }}
          </div>
          <q-infinite-scroll
            @load="fetchCategory"
            :scroll-target="scrollTargetRef"
            :offset="100"
          >
            <q-item
              clickable
              v-close-popup
              v-for="(item, index) in categoryList"
              :key="index"
              @click="(evt) => onItemClick(item)"
            >
              <q-item-section>
                <q-item-label>
                  {{ item.label }}
                  <span v-if="isSelected(item.value)">
                    <q-icon name="done" color="primary" />
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <template v-slot:loading>
              <div v-if="loading" class="text-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
// import { Logger } from '@/utils/logger';
export default {
  name: 'SelectionDropdown',
  props: {
    isOutlined: { type: Boolean, default: true },
    isMultiple: { type: Boolean, default: false },
    enumName: { type: String, default: '' },
    dropdownLabel: { type: String, default: 'Pilih Kategori' },
    parentCategory: { type: Object, default: null },
    isFilter: { type: Boolean, default: false },
    selectedCategoryProp: { default: null },
    parentId: { type: Number, default: null },
    isOffline: { type: Boolean, default: false },
    categoryListProp: { type: Array, default: () => [] },
  },
  data() {
    return {
      categoryList: [],
      selectedCategory: null,
      selectedCategories: [],
      selectedSentCategory: null,
      maxMember: true,
      minCharLength: 0,
      stateFilter: 'offline',
      items: [],
      totalItem: null,
      loading: false,
      filter: '',
      countPage: 0,
      scrollTargetRef: null,
      page: 1,
      rowsPerPage: 15,
      sortBy: 'created_at',
      sortDir: 'desc',
    };
  },
  // watch: {
  //   selectedCategoryProp (val, oldVal) {
  //     if (val) {
  //       this.onItemClick(val)
  //     }
  //   }
  // },
  created() {
    if (!this.isMultiple && this.selectedCategoryProp !== null) {
      this.selectedCategory = this.selectedCategoryProp;
    }
  },
  computed: {
    getDropdownLabel() {
      if (!this.isMultiple && this.selectedCategory !== null) {
        return this.selectedCategory.label;
      }
      return this.dropdownLabel;
    },
  },
  methods: {
    isSelected(value) {
      let filtered;
      if (this.isMultiple) {
        filtered = this.selectedCategories.filter((x) => x.value === value);
      } else {
        let selected = [];
        if (this.selectedCategory !== null) {
          selected = [this.selectedCategory];
          filtered = selected.filter((x) => x.value === value);
        }
      }
      if (filtered && filtered.length > 0) {
        return true;
      } else return false;
    },
    async onItemClick(item) {
      // Logger.info('selected category', item)();
      // const isAlreadySelected = this.selectedCategories.find(category => category.value === item.value)
      // if (isAlreadySelected) {
      //   this.selectedCategories = this.selectedCategories.filter(category => category.value !== item.value)
      // } else {
      //   this.selectedCategories.push(item)
      // }
      // this.$emit('input', { enum: this.enumName, val: this.selectedCategories })

      if (this.isMultiple) {
        // Logger.info('selected:', item)();
        // Logger.info('selected categories:', this.selectedCategories)();
        if (this.selectedCategories.length === 0) {
          this.selectedCategories.push(item);
          this.selectedSentCategory = item;
        } else {
          const duplicate = this.selectedCategories.filter(
            (x) => x.value === item.value
          );
          if (duplicate.length === 0) {
            this.selectedCategories.push(item);
            this.selectedSentCategory = item;
          }
        }
        this.$emit('input', {
          enum: this.enumName,
          val: this.selectedSentCategory,
        });
      } else {
        this.selectedCategory = item;
        // Logger.info('selected:', item)();
        this.$emit('input', {
          enum: this.enumName,
          val: this.selectedCategory,
        });
      }
      // this.label = item.label
    },
    handleInitiateDropdown() {
      if (this.isMultiple) {
        this.selectedCategories = this.selectedCategoryProp;
      } else this.selectedCategory = this.selectedCategoryProp;
    },
    async fetchCategory(index, done) {
      this.loading = true;
      this.page = index;
      if (index === 1) {
        this.categoryList = [];
      }
      if (this.isOffline) {
        this.categoryList = this.categoryListProp;
        done();
        this.loading = false;
      } else {
        try {
          // Logger.info('-->', index, 'Category Dropdown')();
          const params = {
            page: this.page,
            rowsPerPage: this.rowsPerPage,
            sortBy: this.sortBy, // 'created_at',
            sortDir: this.sortDir, // 'desc',
          };
          if (this.filter && this.filter.length > 0) {
            params['query'] = this.filter;
          }
          if (this.parentCategory) {
            // params['filter'] = [{
            //   field: 'product_category_id_parent',
            //   op: 'eq',
            //   val: this.parentCategory.id
            // }]
          }
          let res;
          switch (this.enumName) {
            case 'ktpProvinceAndCity':
            case 'companyProvinceAndCityID':
            case 'spouseCompanyProvinceAndCityID':
              res = await this.$service.rdnRequest.getProvincesAndCities(
                params
              );
              break;
            case 'ktpDistrict':
              params['filter'] = [
                {
                  field: 'provinceAndCityID',
                  op: 'eq',
                  val: this.parentCategory.value.toString(),
                },
              ];
              res = await this.$service.rdnRequest.getDistricts(params);
              break;
            case 'ktpSubdistrict':
            case 'ktpPostalCode':
              params['filter'] = [
                {
                  field: 'districtName',
                  op: 'eq',
                  val: this.parentCategory.value,
                },
              ];
              res = await this.$service.rdnRequest.getSubDistricts(params);
              break;
            default:
              break;
          }
          if (res) {
            const data = res.toObject();
            // Logger.info('response fetchCategory', data, 'Category Dropdown')();
            let tempDataList = [];
            for (const item of data.resultsList) {
              switch (this.enumName) {
                case 'ktpProvinceAndCity':
                case 'companyProvinceAndCityID':
                case 'spouseCompanyProvinceAndCityID':
                  tempDataList.push({
                    label: `${item.provincename} - ${item.citydisplayname}`,
                    value: {
                      provinceid: item.id,
                      provincename: item.provincename,
                      citydisplayname: item.citydisplayname,
                      cityname: item.cityname,
                    },
                  });
                  break;
                // case 'companyCityName':
                //   tempDataList.push({
                //     label: `${item.citydisplayname} - ${item.cityname}`,
                //     value: item.id
                //   })
                //   break
                case 'ktpDistrict':
                  tempDataList.push({
                    label: `${item.districtname} - ${item.subdistrictname}`,
                    value: item.districtname,
                  });
                  break;
                case 'ktpSubdistrict':
                  tempDataList.push({
                    label: `${item.subdistrictname}`,
                    value: item.subdistrictname,
                  });
                  break;
                case 'ktpPostalCode':
                  tempDataList.push({
                    label: `${item.postalcode}`,
                    value: item.postalcode,
                  });
                  break;
                default:
                  break;
              }
            }
            const localDataList = this.categoryList.concat(tempDataList);
            this.categoryList = tempDataList.concat(tempDataList);
            this.countPage = data.pagination.count;
            this.categoryList = Object.assign([], localDataList);
            if (this.categoryList.length < this.countPage) {
              done();
            }
            // Logger.info('categoryList', this.categoryList)();
            this.loading = false;
          }
        } catch (error) {
          // Logger.error('error fetchCategory', error)();
          this.loading = false;
        }
      }
    },
    async handleInput(val) {
      // Logger.info('search', val)();
      this.filter = val;
      this.categoryList = [];
      await this.fetchCategory();
    },
    resetDropdown() {
      this.filter = '';
      this.categoryList = [];
      this.selectedCategories = [];
      this.selectedCategory = null;
      this.selectedSentCategory = null;
    },
  },
};
</script>
