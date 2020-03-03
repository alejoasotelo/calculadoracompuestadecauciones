var app = new Vue({
    el: '#calculadora',
    data: {
        monto: 1000,
        plazo: 7,
        tna: 33,
        cantidad: 1,
        intereses: 0,
        comision: 0,
        derechos: 0,
        iva: 0,
        animGanancia: 0,
        animIntereses: 0,
        animComision: 0,
        animDerechos: 0,
        animIva: 0
    },
    created: function () {

    },
    computed: {
        ganancia: function () {
            var ganancia = this.caucionCompuesta(parseFloat(this.monto), parseFloat(this.plazo), parseFloat(this.tna), parseInt(this.cantidad)).toFixed(2);
            this.intereses = (ganancia - parseFloat(this.monto)).toFixed(2);

            TweenLite.to(this.$data, 0.25, { animIntereses: this.intereses});
            TweenLite.to(this.$data, 0.5, { animGanancia: ganancia });
            return ganancia;
        }
    },
    methods: {
        caucionar: function (monto, plazo, tna) {
            var comision = (0.0015 / 30 * plazo) * monto;
            var iva = comision * 0.21;
            var derechos = (0.00045 / 90 * plazo * monto) * 1.21;
            var interes = monto * (tna / 100 / 365 * plazo);
            var montoARetirar = monto + interes - derechos - iva - comision;
            //console.log(montoARetirar, comision, iva, derechos, interes);
            return {
                comision,
                iva,
                derechos,
                interes,
                montoARetirar
            };
        },
        caucionCompuesta: function (montoInicial, plazo, tna, cantidad) {
            var montoFinal = 0;
            this.comision = 0;
            this.derechos = 0;
            this.iva = 0;

            var montoCaucionadoAnt = montoInicial;

            for (var i = 0; i < cantidad; i++) {
                var res = this.caucionar(montoCaucionadoAnt, plazo, tna);
                var montoCaucionado = res.montoARetirar;
                this.comision += res.comision;
                this.derechos += res.derechos;
                this.iva += res.iva;

                montoCaucionadoAnt = montoCaucionado;
            }
                    
            TweenLite.to(this.$data, 0.75, { animComision: this.comision});
            TweenLite.to(this.$data, 1, { animDerechos: this.derechos});  
            TweenLite.to(this.$data, 1.25, { animIva: this.iva});  

            montoFinal = montoCaucionado;
            return montoFinal;
        }
    }
})