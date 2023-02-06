import React, { useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";

function Page4() {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();

  return (
    <Page4Container>
      <Container>
        <H5>NOTICE OF PRIVACY PRACTICE</H5>
        <Top>
          <Span style={{ fontWeight: 800, marginBottom: "10px" }}>
            All fields marked with * are required
          </Span>
          <p>
            <b>Article 1: Agreement to Arbitrate:</b>
            <br />
            It is understood that any dispute as to medical malpractice, that is
            as to whether any medical services rendered under this contract were
            unnecessary or unauthorized or were improperly, negligently or
            incompetently rendered, will be determined by submission to
            arbitration as provided by state and federal law, and not by a
            lawsuit or resort to court process, except as state and federal law
            provides for judicial review of arbitration proceedings. Both
            parties to this contract, by entering into it, are giving up their
            constitutional right to have any such dispute decided in a court of
            law before a jury, and instead are accepting the use of arbitration.
            Further, the parties will not have the right to participate as a
            member of any class of claimants, and there shall be no authority
            for any dispute to be decided on a class action basis. An
            arbitration can only decide a dispute between the parties and may
            not consolidate or join the claims of other persons who have similar
            claims.
          </p>
          <p>
            <b>Article 2: All Claims Must be Arbitrated:</b>
            <br />
            It is also understood that any dispute that does not relate to
            medical malpractice, including disputes as to whether or not a
            dispute is subject to arbitration, as to whether this agreement is
            unconscionable, and any procedural disputes, will also be determined
            by submission to binding arbitration. It is the intention of the
            parties that this agreement bind all parties as to all claims,
            including claims arising out of or relating to treatment or services
            provided by the health care provider, including any heirs or past,
            present or future spouse(s) of the patient in relation to all
            claims, including loss of consortium. This agreement is also
            intended to bind any children of the patient whether born or unborn
            at the time of the occurrence giving rise to any claim. This
            agreement is intended to bind the patient and the health care
            provider and/or other licensed health care providers, preceptors, or
            interns who now or in the future treat the patient while employed
            by, working or associated with or serving as a back-up for the
            health care provider, including those working at the health care
            provider's clinic or office or any other clinic or office whether
            signatories to this form or not.
            <br />
            <br />
            All claims for monetary damages exceeding the jurisdictional limit
            of the small claims court against the health care provider, and/or
            the health care provider's associates, association, corporation,
            partnership, employees, agents and estate, must be arbitrated
            including, without limitation, claims for loss of consortium,
            wrongful death, emotional distress, injunctive relief, or punitive
            damages. This agreement is intended to create an open book account
            unless and until revoked.
          </p>
          <p>
            <b>Article 3: Procedures and Applicable Law:</b>
            <br />A demand for arbitration must be communicated in writing to
            all parties. Each party shall select an arbitrator (party
            arbitrator) within thirty days, and a third arbitrator (neutral
            arbitrator) shall be selected by the arbitrators appointed by the
            parties within thirty days thereafter. The neutral arbitrator shall
            then be the sole arbitrator and shall decide the arbitration. Each
            party to the arbitration shall pay such party's pro rata share of
            the expenses and fees of the neutral arbitrator, together with other
            expenses of the arbitration incurred or approved by the neutral
            arbitrator, not including counsel fees, witness fees, or other
            expenses incurred by a party for such party's own benefit. Either
            party shall have the absolute right to bifurcate the issues of
            liability and damage upon written request to the neutral arbitrator.
            <br />
            <br />
            The parties consent to the intervention and joinder in this
            arbitration of any person or entity that would otherwise be a pro
            per additional party in a court action, and upon such intervention
            and joinder, any existing court action against such additional
            person or entity shall be stayed pending arbitration. The parties
            agree that provisions of state and federal law, where applicable,
            establishing the right to introduce evidence of any amount payable
            as a benefit to the patient to the maximum extent permitted by law,
            limiting the right to recover non-economic losses, and the right to
            have a judgment for future damages conformed to periodic payments,
            shall apply to disputes within this Arbitration Agreement. The
            parties further agree that the Commercial Arbitration Rules of the
            American Arbitration Association shall govern any arbitration
            conducted pursuant to this Arbitration Agreement.
          </p>
          <p>
            <b>Article 4: General Provision:</b>All claims based upon the same
            incident, transaction, or related circumstances shall be arbitrated
            in one proceeding. A claim shall be waived and forever barred if (1)
            on the date notice thereof is received, the claim, if asserted in a
            civil action, would be barred by the applicable legal statute of
            limitations, or (2) the claimant fails to pursue the arbitration
            claim in accordance with the procedures prescribed herein with
            reasonable diligence.
          </p>
          <p>
            <b>Article 5: Revocation:</b>This agreement may be revoked by
            written notice delivered to the health care provider within 30 days
            of signature and, if not revoked, will govern all professional
            services received by the patient and all other disputes between the
            parties.
          </p>
          <p>
            <b>Article 6: Retroactive Effect:</b>If patient intends this
            agreement to cover services rendered before the date it is signed
            (for example, emergency treatment), patient should initial below.
          </p>
        </Top>
        <Insection>
          <label htmlFor="initial">Initial Here:</label>
          <input type="text" />
          <p>
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>
              Effective as of the date of first professional services.
            </span>
          </p>
        </Insection>
        <Extra>
          <p>
            If any provision of this Arbitration Agreement is held invalid or
            unenforceable, the remaining provisions shall remain in full force
            and shall not be affected by the invalidity of any other provision.
            I understand that I have the right to receive a copy of this
            Arbitration Agreement. By my signature below, I acknowledge that I
            have received a copy.
          </p>
          <Span>
            NOTICE: BY SIGNING THIS CONTRACT YOU ARE AGREEING TO HAVE ANY ISSUE
            OF MEDICAL MALPRACTICE DECIDED BY NEUTRAL ARBITRATION AND YOU ARE
            GIVING UP YOUR RIGHT TO A JURY OR COURT TRIAL. SEE ARTICLE 1 OF THIS
            CONTRACT.
          </Span>
        </Extra>
        <Insection>
          <label htmlFor="Representative">
            *Patient/Representative Signature:
          </label>
          <p>
            Please sign in the box below using your mouse, touch screen, or
            touchpad.
          </p>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="green"
            style={{ background: "gray" }}
            canvasProps={{
              width: 600,
              height: 200,
              className: "sigCanvas",
            }}
          />
          <button onClick={clear}>Clear</button>
          <p>I accept that this is the legal representation of my signature.</p>
        </Insection>

        <TodayDate>
          <Span>*Date:</Span>
          <input type="date" />
        </TodayDate>
      </Container>
    </Page4Container>
  );
}

export default Page4;

const Page4Container = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 30px 10px;

  p,
  li {
    font-size: 14px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
  border-top: 2px solid var(--blue);
`;

const Insection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  input {
    width: 100%;
    padding: 7px;
  }
  .sigCanvas {
    border: 2px dashed black;
    background: var(--lightgray);
    margin: 7px 0;
    @media (max-width: 683px) {
      width: 100%;
    }
  }
  button {
    padding: 3px 7px;
  }
`;

const TodayDate = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
  input {
    width: 100%;
    padding: 7px;
  }
`;

const Extra = styled.div``;

const H5 = styled.h5``;

const Span = styled.span``;
