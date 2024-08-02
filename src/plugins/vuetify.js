import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    // components는 뷰티파이에서 사용할 수 있는 ui 컴포넌트들을 의미 
    components,

    // directives는 뷰티파이에서 htlm 요소에 행동을 부여하는데 사용함 
    directives
});

