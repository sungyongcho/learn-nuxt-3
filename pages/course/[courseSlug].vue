<template>
  <div>
    <AppCard>
      <template #header>
        <div class="text-h5 text-weight-medium">{{ course?.title }}</div>
        <div class="flex q-gutter-x-sm items-center q-mt-sm text-grey-8">
          <span class="flex items-center">
            <q-icon name="star" size="16px" color="orange" />
            <span>{{ course?.rating }}</span>
          </span>
          <span> {{ course?.reviewsCount }}개의 수강평 </span>
          <span>&middot;</span>
          <span>{{ course?.studentCount }}명의 수강생</span>
          <q-space />
          <a class="text-bold" :href="course?.reviewsUrl" target="_blank">
            수강평 보기
          </a>
        </div>
      </template>
      <div class="q-mb-md">
        <VideoPlayer :src="course?.video" />
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            label="인프런에서 수강하기"
            unelevated
            class="full-width"
            color="primary"
            :href="course?.inflearnUrl"
            target="_blank"
          />
        </div>
        <div class="col-6">
          <q-btn
            label="짐코딩 클럽에서 수강하기"
            unelevated
            class="full-width"
            color="red"
            :href="course?.gymcodingUrl"
            target="_blank"
          />
        </div>
      </div>
      <p class="q-mt-lg text-grey-8">
        {{ course?.content }}
      </p>
      <q-separator class="q-mb-lg" />
      <q-form class="q-gutter-y-md">
        <q-btn
          label="수강완료"
          class="full-width"
          color="green"
          unelevated
          :outline="completed ? false : true"
          :icon="completed ? 'check' : undefined"
          @click="toggleComplete"
        />
        <q-input
          v-model="memo"
          type="textarea"
          outlined
          dense
          placeholder="메모를 작성해주세요."
          rows="3"
          autogrow
        />
      </q-form>
      <template #footer>
        <ClientOnly>
          <q-btn
            v-if="prevCourse"
            label="이전 강의"
            color="primary"
            unelevated
            @click="movePage(prevCourse.path)"
          />
          <q-btn
            label="쿼리 추가"
            color="dark"
            ulelevated
            :to="{ path: $route.path, query: { timestamp: Date.now() } }"
          />
          <q-space />
          <q-btn
            v-if="nextCourse"
            label="다음 강의"
            color="primary"
            unelevated
            @click="movePage(nextCourse.path)"
          />
        </ClientOnly>
      </template>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const courseSlug = route.params.courseSlug as string;
const { course, prevCourse, nextCourse } = useCourse(courseSlug);
console.log('before error:1', process.server);
// if (!course) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'course not found',
//     // fatal: true,
//   });
// }

console.log('[courseSlug].vue component setup hooks');
// cannot use
// const title = ref('');
definePageMeta({
  key: (route) => route.fullPath,
  title: 'world hello',
  pageType: '',
  // keepalive: true,
  // cannot use
  // title: title.value,
  alias: ['/lecture/:courseSlug'],
  validate: (route) => {
    const courseSlug = route.params.courseSlug as string;
    const { course } = useCourse(courseSlug);
    if (!course) {
      // return false;
      throw createError({
        statusCode: 404,
        statusMessage: 'course not found',
        // fatal: true,
      });
    }
    return true;
  },
});
const memo = ref('');
const completed = ref(false);

const movePage = async (path: string) => {
  await navigateTo(path);
};

const toggleComplete = () => {
  // $fetch('/api/error');
  // showError('에러발생');
  completed.value != completed.value;
  throw createError('found error.');
};
</script>

<style scoped></style>
