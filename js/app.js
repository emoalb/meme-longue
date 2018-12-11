$(()=>{
    const app = Sammy('#container', function () {
        //init
        this.use('Handlebars', 'hbs');
        this.get('/', getWelcomePage);
        this.get('index.html', getWelcomePage);
        this.get('#/login',(ctx)=> {
            ctx.loadPartials(HEAD_FOOT
            ).then(function () {
                this.partial('./templates/forms/login.hbs');
            });
        });
        this.get('#/register',(ctx)=> {
            ctx.loadPartials(HEAD_FOOT
            ).then(function () {
                this.partial('./templates/forms/register.hbs');
            });
        });
        this.post('#/register',(ctx)=>{
            let repeatPassword = ctx.params.repeatPass;
            let userData = {
                username:ctx.params.username,
                password:ctx.params.password,
                email:ctx.params.email,
                avatarUrl:ctx.params.avatarUrl
            };
            if (!/^[A-Za-z]{3,}$/.test(userData.username)) {
                notify.showError('Username should be at least 3 characters long and contain only english alphabet letters');
            } else if (!/^[A-Za-z\d]{6,}$/.test(userData.password)) {
                notify.showError('Password should be at least 6 characters long and contain only english alphabet letters');
            } else if (repeatPassword !== userData.password) {
                notify.showError('Passwords must match!');
            } else {
                auth.register(userData)
                    .then((authData) => {
                        auth.saveSession(authData);
                        notify.showInfo('User registration successful!');
                        getWelcomePage(ctx);
                    })
                    .catch(notify.handleError);
            }
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (username === '' || password === '') {
                notify.showError('All fields should be non-empty!');
            } else {
                auth.login(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('Login successful.');
                        getWelcomePage(ctx)
                    })
                    .catch(notify.handleError);
            }
        });
        this.get('#/logout',(ctx)=>{
            auth.logout().then(()=>{
                sessionStorage.clear();
                notify.showInfo('Logout successful.');
                getWelcomePage(ctx);
            }) .catch(notify.handleError);
            });

    });

    function getWelcomePage(ctx) {
        ctx.isAuth=auth.isAuth();
        if (!auth.isAuth()) {

            ctx.loadPartials(HEAD_FOOT).then(function () {
                this.partial('./templates/welcome-guest.hbs');
            });

        }else {
            memeService.getAllMemes()
                .then((memes) => {
                    memes.forEach((p, i) => {
                        p.isCreator = p._acl.creator === sessionStorage.getItem('userId');
                    });

            ctx.username = sessionStorage.getItem('username');
            ctx.memes=memes;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
              meme:'./templates/meme.hbs'}).then(function () {
                this.partial('./templates/memes.hbs');
            });
                });
        }

        ctx.redirect('/');
    }
    app.run();
});