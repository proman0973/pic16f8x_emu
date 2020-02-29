use yew::agent::{Dispatched, Dispatcher};
use yew::prelude::*;

use super::CPUAgent;
use super::Request;

pub struct Controls {
    link: ComponentLink<Self>,
    dispatcher: Dispatcher<CPUAgent>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ControlMsg {
    Run,
    Step,
    Stop,
}

impl Component for Controls {
    type Message = ControlMsg;
    type Properties = ();

    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            dispatcher: CPUAgent::dispatcher(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            _ => self.dispatcher.send(Request::Control(msg)),
        }

        false
    }

    fn view(&self) -> Html {
        let run_cb = self.link.callback(|_| ControlMsg::Run);
        let step_cb = self.link.callback(|_| ControlMsg::Step);
        let stop_cb = self.link.callback(|_| ControlMsg::Stop);

        html! {
            <div>
                <button onclick=run_cb>{ "Run" }</button>
                <button onclick=step_cb>{ "Step" }</button>
                <button onclick=stop_cb>{ "Stop" }</button>
            </div>
        }
    }
}
