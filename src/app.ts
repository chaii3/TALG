// @ts-ignore
import Component from 'vue-class-component';
import Vue from 'vue';
import Child from './components/child';

@Component({
	template: `
	          <div>
	          	Component Texts
              	<Child/>
              </div>
      `,
	components: {
		Child,
	},
})
export default class App extends Vue {
	public mounted(): void {
		console.log('log from root component');
	}
}
