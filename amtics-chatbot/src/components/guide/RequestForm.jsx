import React from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

const RequestForm = () => {
    return (
        <Card className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Request New Knowledge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
                Is the bot missing something? Request new documents or topics to be indexed.
            </p>
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Document name or topic..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <textarea
                    placeholder="Why is this information needed?"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
                <Button className="w-full py-3" variant="primary">
                    Submit Request
                </Button>
            </div>
        </Card>
    );
};

export default RequestForm;
