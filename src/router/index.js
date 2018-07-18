import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Student from '@/components/student/studentHome';
import TeacherHome from '@/components/teacher/teacherHome';
import assess from '@/components/assess/assess';
import totur from '@/components/totur/totur';
import acceptdetails from '@/components/acceptdetails/acceptdetails';
import studentDetail from '@/components/acceptdetails/teacherStudent';
import assessdetail from '@/components/assessdetail/assessdetail';
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/studentPage',
            component: Student
        },
        {
            path: '/studentDetail',
            component: studentDetail
        },
        {
            path: '/teacherPage',
            component: TeacherHome
        },
        {
            path: '/assess',
            name: 'assess',
            component: assess
        }, {
            path: '/totur',
            name: 'totur',
            component: totur
        }, {
            path: '/acceptdetails',
            name: 'acceptdetails',
            component: acceptdetails
        }, {
            path: '/assessdetail',
            name: 'assessdetail',
            component: assessdetail
        }
    ]
})