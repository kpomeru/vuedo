# Introducing VueDo: A Todo Vue 3 Application

![VueDo Banner](https://tallblog.kpomeru.com/posts/wZsztSbIPKYPp0V8bgTJIQUQmGSqJsw0GClIzUw0.svg "VueDo Banner")

VueDo is a Todo application built on Vue 3 & Pinia firebase. This to-do app has a parent-child relationship between projects and tasks; it also includes a comment feature for projects and tasks.

## Features

- Projects
- Tasks
- Comments (for Tasks and Projects)
- Drag and drop tasks
- Responsive design

![VueDo UI](https://tallblog.kpomeru.com/posts/editor/C5WQ41VcytOv3wiMIk2DSGQG78VZ3KbsQcMRFjQg.png "VueDo UI")

## Tools

### VueJS

First, if you already do not know, this project is all VueJs 3. I have been using Vue 2.* for a couple of years now and I must say the setup structure and composition API in the latest version bought me over completely.

### Firebase

Firebase is a great kick-off point for hands-on services during frontend development and sometimes backend. We used Authentication and Firestore modules for VueDo. Due to transaction cost impact, I used one collection (projects) and housed everything else within. Projects can have comments or tasks, and a task collection can have comments as well.

### Pinia

Yes!!! Don't you just love what this tool accomplishes in your Vue 3 project? Switching from vuex for state management to Pinia, shows VueJS is heading in a positive and welcomed direction.

### Last, TailwindCSS

To quickly get up a running with styling VueDo, I used Tailwindcss (v 3.*).

View: [VueDo](https://vuedo.kpomeru.com/)
