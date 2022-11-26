export default function Security() {
    return (
        <>
            <div className="text-start">
                <h3 className="mb-4">Security Settings</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Login</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Two-factor auth</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                    Account Recovery
                                </label>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <hr/>
                    <div className="row">
                        <div className="col-md-6 text-start">
                            <button className="btn btn-outline-danger">Cancel</button>
                        </div>
                        <div className="col-md-6 text-end">
                            <button className="btn btn-outline-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}