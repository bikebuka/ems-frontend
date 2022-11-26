export default function Password() {
    return (
        <>
            <div className="text-start">
                <h3 className="mb-4">Password Settings</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Old password</label>
                            <input type="password" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>New password</label>
                            <input type="password" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Confirm new password</label>
                            <input type="password" className="form-control"/>
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
    )
}