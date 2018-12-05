$(()=>{
    const app = Sammy('#container', function () {
        //init
        this.use('Handlebars', 'hbs');
        this.get('/', getWelcomePage);
        this.get('#/login',(ctx)=> {
            ctx.loadPartials({


                }
            ).then(function () {
                this.partial('./templates/forms/login.hbs');
            });


        });

        this.get('#/register',(ctx)=> {
            ctx.loadPartials({


                }
            ).then(function () {
                this.partial('./templates/forms/register.hbs');
            });


        });
    });

    function getWelcomePage(ctx) {
        if (!auth.isAuth()) {
            ctx.isAuth=false;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
               footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/welcome-guest.hbs');
            });
            ctx.redirect('/');
        }

    }
    app.run();
});