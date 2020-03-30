import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import InvestForm from "@/components/InvestForm.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

const testProps = {
  amountMin: 10000,
  amountMax: 100000,
  durationMin: 1,
  durationMax: 5
};

describe("InvestForm.vue connect", () => {
  let getters;
  let actions;
  let state;
  let store;

  beforeEach(() => {
    state = {
      annuities: null
    };

    getters = {
      annuities: () => null,
      monthlyInstallment: () => 0
    };

    actions = {
      loadAnnuities: jest.fn(() =>
        Promise.resolve({ amount: 10001, duration: 4, monthlyInstallment: 1 })
      )
    };

    store = new Vuex.Store({
      modules: {
        invest: {
          namespaced: true,
          state,
          getters,
          actions
        }
      }
    });
  });

  test("Exist elements", () => {
    const wrapper = mount(InvestForm, { store, localVue });

    const button = wrapper.find("button");
    expect(button.is("button")).toBe(true);

    const input = wrapper.findAll("input").length;
    expect(input).toBe(2);
  });

  test("Exist props", () => {
    const wrapper = mount(InvestForm, {
      propsData: testProps,
      store,
      localVue
    });

    expect(wrapper.props().amountMin).toBe(10000);
    expect(wrapper.props().amountMax).toBe(100000);
    expect(wrapper.props().durationMin).toBe(1);
    expect(wrapper.props().durationMax).toBe(5);
  });

  test("Exist init data", () => {
    const wrapper = mount(InvestForm, {
      propsData: testProps,
      store,
      localVue
    });

    expect(wrapper.vm.form.amount).toBe(100000);
    expect(wrapper.vm.form.duration).toBe(5);
  });

  test("Submit sucess", async () => {
    const wrapper = mount(InvestForm, {
      propsData: testProps,
      store,
      localVue
    });

    expect(wrapper.vm.form.amount).toBe(100000);
    expect(wrapper.vm.form.duration).toBe(5);

    const button = wrapper.find("button");
    button.trigger("click");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const div = wrapper.find("#monthlyInstallment");
    expect(div.is("div")).toBe(true);

    expect(wrapper.vm.error).toBe(null);
    expect(wrapper.vm.loaded).toBe(true);
    expect(wrapper.vm.form.amount).toBe(10001);
    expect(wrapper.vm.form.duration).toBe(4);
  });
});

describe("InvestForm.vue disconnect", () => {
  let getters;
  let actions;
  let state;
  let store;

  beforeEach(() => {
    state = {
      annuities: null
    };

    getters = {
      annuities: () => null,
      monthlyInstallment: () => 0
    };

    actions = {
      loadAnnuities: jest.fn(() => Promise.reject({ message: "error test" }))
    };

    store = new Vuex.Store({
      modules: {
        invest: {
          namespaced: true,
          state,
          getters,
          actions
        }
      }
    });
  });

  test("Submit offline", async () => {
    const wrapper = mount(InvestForm, {
      propsData: testProps,
      store,
      localVue
    });

    expect(wrapper.vm.form.amount).toBe(100000);
    expect(wrapper.vm.form.duration).toBe(5);

    const button = wrapper.find("button");
    button.trigger("click");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.error).toBe("error test");
  });
});
