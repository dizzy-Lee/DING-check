import Vue from 'vue';
import Vuex from 'vuex';
import main from '../assets/js/main.js';
import axios from 'axios';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        ID: null, //用户ID
        IMG: '../../static/img/蕉迟但到.jpg', //用户头像
        NAME: '', //用户名称
        studentData: [],
        MRIMG: '../../static/img/蕉迟但到.jpg',

        studentHomeShow: {},
        teacherShow: {},
        student_name: '',
        //未知
        data: [],
        // 李祎帆修改后
        date: '',
        count: '',
        detail: [],
        studentId: '',
        tutorId: '',
        tutorImg: '',
        studentDetail: [],
        studentImg: '',
        studentName: '',
        //张晗雨修改后
        studentHomeShow: {},
        teacherShow: {},
        student_id: '623103604858277',
        tutor_id: '',
        teacher_id: '',
        teacherDetail: [], //这个只是存储时间和次数的
        teacher_Detail: [], //这个存储详细信息
        teacher_Detail_2: [], //这个是存储未创建验收的人
        teacher_Student_Detail: null, //这个存储教师点击学生的时候进行查看学生的评价

    },
    actions: {
        changetutorId(ctx, tutorId) {
            ctx.commit('changetutorId', tutorId)
        },
        changeStudentName(ctx, student_name) {
            ctx.commit('changeStudentName', student_name)
        },
        changeAssessData(ctx, { date, count, detail }) {
            ctx.commit('changeAssessData', { date, count, detail })
        },
        pushStudentDetail(ctx, item) {
            ctx.commit('pushStudentDetail', item)
        }
    },
    mutations: {
        //存储钉钉数据
        pushStudentData(store, data) {
            store.studentData = data;
        },

        //获取USER_ID
        getUserInfo(store, data) {

            store.ID = data.userid;
            store.NAME = data.name;
            store.IMG = data.avatar;


        },
        infoStudentShow(store, data) {
            store.studentHomeShow = data;
            console.log(store.studentHomeShow);
        },
        changeShowStudent(store, data) {
            Object.assign(store.studentHomeShow, data);
            console.log(store.studentHomeShow);
        },
        getInfoData(store, data) {
            store.teacherShow = data;
            console.log(typeof main.getTimes(5));
        },
        getTeacherDetailDataAndCount(store, data) {
            if (store.teacherDetail.length) {
                store.teacherDetail = data;
            } else {
                Vue.set(store.teacherDetail, 0, data[0]);
                Vue.set(store.teacherDetail, 1, data[1]);
                Vue.set(store.teacherDetail, 2, data[2]);
                //更新视图
            }
        },
        getTeacher_Detail(store, data) {
            // store.teacher_Detail = data;
            console.log(data)
            store.teacher_Detail = [];
            data.forEach(value => {
                if (value.acceptance == true) { //加入已创建验收的
                    store.teacher_Detail.push(value);
                } else if (value.acceptance == false) {
                    store.teacher_Detail_2.push(value);
                    console.log('为创建验收', store.teacher_Detail_2)
                }
            });
            console.log(store.teacher_Detail);

        },
        getTeacherStudent(store, data) {
            store.teacher_Student_Detail = data;
            store.teacher_Student_Detail.studentID = store.teacher_Student_Detail.studentID.replace(/(^\s+)|(\s+$)/g, "");
            if (store.teacher_Student_Detail.quickEvaluate != null) {
                store.teacher_Student_Detail.quickEvaluate = store.teacher_Student_Detail.quickEvaluate.split(',');
            }

            console.log('9999999999', store.teacher_Student_Detail)
        },
        subCount(store, data) {

            if ((store.teacherDetail[1] - data) <= 0) {
                return;
            }
            Vue.set(store.teacherDetail, 1, store.teacherDetail[1] - data);
            axios.post("/api/teacher-load-click", {
                getData: true,
                teacher_id: store.ID,
                date: store.teacherDetail[0],
                count: store.teacherDetail[1]
            }).then(res => {

                console.log(res.data.detail);
                var data = res.data.detail;
                axios
                    .post("/api/dd/student", {
                        getData: true,
                        userID: store.ID
                    })
                    .then(request => {
                        //妈的 遍历钉钉给的东西！！！！加入到后端返回的数据中 别看多 别问我为什么不用forEach和for in 因为for循环执行效率最高！
                        for (let i = 0; i < request.data.userlist.length; i++) {
                            for (let j = 0; j < res.data.detail.length; j++) {
                                if (res.data.detail[j].acceptance == true) {
                                    for (
                                        let k = 0; k < res.data.detail[j].student.length; k++
                                    ) {
                                        if (
                                            res.data.detail[j].tutor ==
                                            request.data.userlist[i].userid
                                        ) {
                                            res.data.detail[j].img =
                                                request.data.userlist[i].avatar;
                                            res.data.detail[j].name = request.data.userlist[i].name;
                                        }
                                        if (
                                            request.data.userlist[i].userid ==
                                            res.data.detail[j].student[k].studentID
                                        ) {

                                            res.data.detail[j].student[k].img =
                                                request.data.userlist[i].avatar;
                                            res.data.detail[j].student[k].name =
                                                request.data.userlist[i].name;
                                            if (res.data.detail[j].student[k].img == "") {
                                                res.data.detail[j].student[k].img = '../../static/img/蕉迟但到.jpg'
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        for (let i = 0; i < request.data.userlist.length; i++) {
                            for (let j = 0; j < res.data.detail.length; j++) {
                                if (res.data.detail[j].acceptance == false) {
                                    for (let k = 0; k < res.data.detail[j].student.length; k++) {
                                        if (res.data.detail[j].tutor == request.data.userlist[i].userid) {
                                            res.data.detail[j].img = request.data.userlist[i].avatar;
                                            res.data.detail[j].name = request.data.userlist[i].name;
                                        }
                                        if (res.data.detail[j].student[k].student == request.data.userlist[i].userid) {
                                            res.data.detail[j].student[k].img = request.data.userlist[i].avatar;
                                            res.data.detail[j].student[k].name = request.data.userlist[i].name;
                                            if (res.data.detail[j].student[k].img == "") {
                                                res.data.detail[j].student[k].img = "../../../../static/img/蕉迟但到.jpg";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let jsonData = res.data.detail
                        store.teacher_Detail = [];
                        jsonData.forEach(value => {
                            if (value.acceptance == true) { //加入已创建验收的
                                store.teacher_Detail.push(value);
                            } else {
                                store.teacher_Detail_2.push(value);
                            }
                        });

                    })




















            });

        },
        addCount(store, data) {
            if ((store.teacherDetail[1] + data) > store.teacherDetail[2]) {

                return;
            }
            Vue.set(store.teacherDetail, 1, store.teacherDetail[1] + data);
            console.log(store.teacherDetail[1])
            axios.post("/api/teacher-load-click", {
                getData: true,
                teacher_id: store.ID,
                date: store.teacherDetail[0],
                count: store.teacherDetail[1]
            }).then(res => {
                console.log(res.data.detail);
                var data = res.data.detail;
                axios
                    .post("/api/dd/student", {
                        getData: true,
                        userID: store.ID
                    })
                    .then(request => {
                        //妈的 遍历钉钉给的东西！！！！加入到后端返回的数据中 别看多 别问我为什么不用forEach和for in 因为for循环执行效率最高！
                        for (let i = 0; i < request.data.userlist.length; i++) {
                            for (let j = 0; j < res.data.detail.length; j++) {
                                if (res.data.detail[j].acceptance == true) {
                                    for (
                                        let k = 0; k < res.data.detail[j].student.length; k++
                                    ) {
                                        if (
                                            res.data.detail[j].tutor ==
                                            request.data.userlist[i].userid
                                        ) {
                                            res.data.detail[j].img =
                                                request.data.userlist[i].avatar;
                                            res.data.detail[j].name = request.data.userlist[i].name;
                                        }
                                        if (
                                            request.data.userlist[i].userid ==
                                            res.data.detail[j].student[k].studentID
                                        ) {

                                            res.data.detail[j].student[k].img =
                                                request.data.userlist[i].avatar;
                                            res.data.detail[j].student[k].name =
                                                request.data.userlist[i].name;
                                            if (res.data.detail[j].student[k].img == "") {
                                                res.data.detail[j].student[k].img = '../../static/img/蕉迟但到.jpg'
                                            }
                                        }
                                    }
                                }
                            }
                        }


                        for (let i = 0; i < request.data.userlist.length; i++) {
                            for (let j = 0; j < res.data.detail.length; j++) {
                                if (res.data.detail[j].acceptance == false) {
                                    for (let k = 0; k < res.data.detail[j].student.length; k++) {
                                        if (res.data.detail[j].tutor == request.data.userlist[i].userid) {
                                            res.data.detail[j].img = request.data.userlist[i].avatar;
                                            res.data.detail[j].name = request.data.userlist[i].name;
                                        }
                                        if (res.data.detail[j].student[k].student == request.data.userlist[i].userid) {
                                            res.data.detail[j].student[k].img = request.data.userlist[i].avatar;
                                            res.data.detail[j].student[k].name = request.data.userlist[i].name;
                                            if (res.data.detail[j].student[k].img == "") {
                                                res.data.detail[j].student[k].img = "../../../../static/img/蕉迟但到.jpg";
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        let jsonData = res.data.detail

                        store.teacher_Detail = [];
                        jsonData.forEach(value => {
                            if (value.acceptance == true) { //加入已创建验收的
                                store.teacher_Detail.push(value);
                            } else {
                                store.teacher_Detail_2.push(value);
                            }
                        });


                    })










                // let jsonData = res.data.detail

                // store.teacher_Detail = [];
                // jsonData.forEach(value => {
                //     if (value.acceptance == true) { //加入已创建验收的
                //         store.teacher_Detail.push(value);
                //     } else {
                //         store.teacher_Detail_2.push(value);
                //     }
                // });
            });
        },


        //助教部分
        changeAssessData(state, { date, count }) {
            state.date = date
            state.count = count
                // state.detail = detail
                // console.log(state.detail)
        },
        changetutorId(state, tutorId) {
            state.tutorId = tutorId.tutorId
            state.tutorImg = tutorId.tutorImg
        },
        changeStudentName(state, student_name) {
            state.studentId = student_name.studentID
            state.studentName = student_name.name
            state.studentImg = student_name.avatar
        },
        pushStudentDetail(state, item) {
            state.studentDetail = item;
            if (state.studentDetail.quickEvaluate != null) {
                state.studentDetail.quickEvaluate = state.studentDetail.quickEvaluate.split(',')
            }
        }
    },
})