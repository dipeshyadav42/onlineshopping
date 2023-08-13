import Left from "./left";

function Dashboard() {
    return ( 
        <section id="mid">
            <div className="container">
            <div className="row">
                <Left/>
                <div className="col-md-9">
                    <img src="logo192.png"/>
                </div>
            </div>
            </div>
        </section>
     );
}

export default Dashboard;